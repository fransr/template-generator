<?
	header("Content-type: text/json");
	$id = @$_GET['id'];
	$data = false;
	$arr = array();
	foreach (glob("tpls/*.md") as $filename) {
		$file = basename($filename);
		$arr[] = $file;
		if($id === $file) $data = file_get_contents($filename);
	}
	echo json_encode(array('list' => $arr, 'data' => $data));