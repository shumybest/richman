CREATE TABLE IF NOT EXISTS `mydb`.`treating` (
  `tid` INT NOT NULL AUTO_INCREMENT,
  `init_uid` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `attendee_number` INT NOT NULL,
  `attendee_Info` VARCHAR(2048) CHARACTER SET 'utf8' NOT NULL DEFAULT '[]',
  `status` INT NOT NULL DEFAULT 0 COMMENT '1 ongoing\n2 closed',
  `attended` INT NOT NULL,
  `method_msg` VARCHAR(2048) NOT NULL DEFAULT '',
  `method_cost` INT NOT NULL DEFAULT 0,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tid`))
  ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`methods` (
  `mid` INT NOT NULL AUTO_INCREMENT,
  `cost` INT NOT NULL,
  `msg` VARCHAR(2048) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`mid`))
  ENGINE = InnoDB;
