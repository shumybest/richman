<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Treating extends CI_Controller {
    public function index() {
        $result = LoginService::check();

        if ($result['loginState'] === Constants::S_AUTH) {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//                $rows = DB::insert('treating', [
//                    'init_uid' => $result['userinfo']['openId'],
//                    'attendee_number' => $_POST['attendee'],
//                    'attended' => 0,
//                    'attendee_Info' => [],
//                    'status' => 1
//                ]);
//                if($rows > 0) {
                    $this->json([
                        'code' => 200,
                        'data' => []
                    ]);
//                } else {
//                    $this->json([
//                        'code' => -1,
//                        'data' => []
//                    ]);
//                }
            } else {
                $rows = DB::select('treating', ['*'], ['init_uid' => $result['userinfo']['openId']]);
                $this->json([
                    'code' => 200,
                    'data' => $rows
                ]);
            }
        } else {
            $this->json([
                'code' => -1,
                'data' => []
            ]);
        }
    }

    public function detail($tid) {
        $result = LoginService::check();

        if ($result['loginState'] === Constants::S_AUTH) {
            $rows = DB::select('treating', ['*'], [
                'init_uid' => $result['userinfo']['openId'],
                'tid' => $tid
            ]);
            $this->json([
                'code' => 200,
                'data' => $rows
            ]);
        } else {
            $this->json([
                'code' => -1,
                'data' => []
            ]);
        }
    }
}
