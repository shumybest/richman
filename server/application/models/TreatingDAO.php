<?php
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

/**
 * Created by PhpStorm.
 * User: shumybest
 * Date: 2018/2/12
 * Time: 下午3:09
 */
class TreatingDAO {
    public static function create($openId, $attendee) {
        DB::insert('treating',
            ['init_uid' => $openId,
             'attendee_number' => $attendee,
             'attended' => 0,
             'attendee_Info' => json_encode([]),
             'status' => 1]);
    }

    public static function findAllByOpenId($openId) {
        return $rows = DB::select('treating', ['*'], ['init_uid' => $openId]);
    }

    public static function findAllByOpenIdAndStatus($openId, $status) {
        return $rows = DB::select('treating', ['*'], [
            'init_uid' => $openId,
            'status' => $status
        ]);
    }

    public static function findOneByTid($tid) {
        return  DB::row('treating', ['*'], ['tid' => $tid]);
    }

    public static function updateByTid($tid, $updates) {
        DB::update('treating', $updates, ['tid' => $tid]);
    }

}