# Email misconfiguration leads to email snooping and postmaster@-access on {{domain}}

### Background

Hi,

Previously a blog post went out about Uber's Sendgrid issues: http://blog.pentestnepal.tech/post/149985438982/reading-ubers-internal-emails-uber-bug-bounty

Also, a report from @uranium238 went out due to a similar issue with Slack: https://hackerone.com/reports/163938

Now, by reasons I do not know, this actually has some issues still unpatched by X, which in combination with a misconfiguration, currently exposes at least `{{domain}}`.

### Technical details 

The problem lies in this issue:

1. You add the domain `{{domain-parent}}` to X
2. X asks you to add a MX record to `{{domain-parent}}`
3. You add that, then X also tells you that to get tracking you need to add a CNAME from `{{domain}}` to x.org as well
4. What is missing here, is for you to actually add `{{domain}}` to your account as a separate domain by itself. By not doing this, anyone can add this domain to their account
5. You probably later on remove the MX from `{{domain-parent}}` again, but the CNAME is still there for `{{domain}}`

The problem with missing out on #4 above is how DNS CNAMEs works. If you have a CNAME pointing to another domain, this CNAME will actually inherit the MX-records from the other domain. This basically means that your `{{domain}}` is now listed with MX-records from X:

```
{{host-lookup}}
```

### PoC

* Due to this, I can claim this domain as mine in X:
{{img-claiming-domain}}

* And due to this, I can now create a mailing list called `postmaster@{{domain}}` with Access-level: `everyone`:
{{img-mailing-list}}

* I'll add my own email as a recipient:
{{img-email-recipient}}

* I'll now try and see if I can receive emails to `postmaster@{{domain}}`:
{{img-send-email}}

* The logs of X will show me the routing:
{{img-log}}

* And my inbox now have the emails sent to `postmaster@{{domain}}`:
{{img-inbox}}


### Mitigation

Since postmaster can be used to issue certificates for these domains, and since no one but you should have access to the whitelisted SSL-issuing aliases (ref: [wiki.mozilla.org](https://wiki.mozilla.org/CA:Problematic_Practices#Email_Address_Prefixes_for_DV_Certs)) I recommend that you:

1. Add the both domains `{{domain}}` to your X account. **I have removed it again so you can take it back, remember that anyone can right now claim it themselves.**
2. Keep in mind that all domains pointing to X (MX/CNAME) needs to be claimed by you, even the sub sub domains of the ones already in X. So make sure that no other domains pointing to X are missing inside your X account.

Regards,<br />
Frans