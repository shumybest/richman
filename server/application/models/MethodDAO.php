<?php
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

/**
 * Created by PhpStorm.
 * User: shumybest
 * Date: 2018/2/14
 * Time: 上午10:30
 */
class MethodDAO {
    public static function getMinMaxIds() {
        return DB::row('methods', ['min(mid) as min', 'max(mid) as max']);
    }

    public static function findOneById($id) {
        return DB::row('methods', ['*'], ['mid' => $id]);
    }
}