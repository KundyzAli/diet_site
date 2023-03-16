<?php
// php - не умеет нативно работать с данными json, поэтому пишем код ниже
$_POST = json_decode(file_get_contents('php://input'), true);
//все что приходит от клиента декодировать из json
echo var_dump($_POST);