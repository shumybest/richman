<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'models/TreatingDAO.php';

class Treating extends CI_Controller {
    public function index() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents("php://input"));
            TreatingDAO::create($this->userInfo['userinfo']['openId'], $data->{'attendee'});
            $this->success('OK');
        } else {
            $status = $this->input->get('status');
            if(isset($status))
                $this->success(TreatingDAO::findAllByOpenIdAndStatus($this->userInfo['userinfo']['openId'], $status));
            else
                $this->success(TreatingDAO::findAllByOpenId($this->userInfo['userinfo']['openId']));
        }
    }

    public function detail($tid) {
        $this->success(TreatingDAO::findOneByTid($tid));
    }

    public function attend($tid) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents("php://input"));
            $row = TreatingDAO::findOneByTid($tid);

            if (isset($row)) {
                $row->{'attended'} += 1;

                if($row->{'attended'} == $row->{'attendee_number'})
                    $row->{'status'} = 2;

                $attendee_Info = json_decode($row->{'attendee_Info'});
                array_push($attendee_Info, $data);
                $row->{'attendee_Info'} = json_encode($attendee_Info);

                TreatingDAO::updateByTid($tid,
                    ['attended' => $row->{'attended'},
                     'attendee_Info' => $row->{'attendee_Info'},
                     'status' => $row->{'status'}]);

                $this->success($row);
                return;
            }
        }

        $this->fail();
    }

    private function success($data) {
        $this->json(['code' => 200,
                     'data' => $data]);
    }

    private function fail() {
        $this->json(['code' => -1,
                     'data' => '']);
    }
}
