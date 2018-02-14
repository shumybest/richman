<?php

/**
 * Created by PhpStorm.
 * User: shumybest
 * Date: 2018/2/13
 * Time: 上午11:21
 */

require_once APPPATH . 'models/MethodDAO.php';

class TreatingMethodHandler {
    public static function getRandomMethod() {

        $data = MethodDAO::getMinMaxIds();
        $randId = rand($data->{'min'}, $data->{'max'});

        return MethodDAO::findOneById($randId);
    }
}