<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Created by PhpStorm.
 * User: shumybest
 * Date: 2018/2/12
 * Time: 下午12:07
 */

use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;

class LoginCheckHook
{
    public function __construct() {
        $this->CI =& get_instance();
    }

    public function checkLogin() {
        // skip check for login or user
        if(get_class($this->CI) == 'Login' or get_class($this->CI) == 'User')
            return;

        $result = LoginService::check();

        if ($result['loginState'] !== Constants::S_AUTH) {
            $this->CI->output
                ->set_content_type('application/json')
                ->set_output(json_encode([
                    'code' => -1,
                    'data' => ['not logged']
                ]))
                ->_display();
            die;
        } else {
            $this->CI->userInfo = $result;
        }
    }

}