### Template generator

A simple variable based template using handlebarjs+strapdownjs. The idea is to use variables in markdown based files to easily replace the variables with content. Data is saved temporarily in local storage. PHP is only needed to generate the list of files in the dropdown of templates.

<img src="https://github.com/fransr/template-generator/raw/examples/example-report.png" width="500" />

Thoughts:

1. I turned off HTML sanitization to make code with <, >, " etc inside:

  ```
  this kind of content
  ```

  So it's easily XSS:able as it is now.

2. I had to hack a bit in strapdown.js due to messy location of files.
3. I had to hack a bit in handlebar.js since I wanted to use `{{lookup}}` as a param, and that wasn't possible to turn off even though I removed it as a helper.
4. Didn't do anything with images, since these still needs to be uploaded elsewhere. A tip here is to name them with what they contain so the tags are easily changeable whenever you use this in your report.

### How to run

```
php -S localhost:8000
```

Place a bunch of `.md` files in the `/tpls/` dir. They should show up in the dropdown. It saves now on every keystroke and will remember the data using localStorage. It will also reuse the variables if you switch template. 

### Disclaimer

This was a weekend project, took a few hours but was totally worth it (was able to gain speed quick using it). It's really messy but, hey, it works.

\o/

Frans Rosén [@fransrosen](https://twitter.com/fransrosen)
