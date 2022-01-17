<?php

function monthlyIncome ($date, $sum, $term, $sumAdd, $percent):float{
    $isLeap = date('L', $date);
    $prevMonth = $sum;
    while ($term > 0){
        $result = $prevMonth + ($prevMonth + $sumAdd) * getDaysBetween($date) * (($percent / 100) / ($isLeap ? 366 : 365));
        $term--;
        $prevMonth = $result;
        $date = nextMonth($date);
    }
    $result = round($result, 2);
    return $result;
}


if (isset($_POST["startDate"]) && isset($_POST["sum"]) && isset($_POST["term"]) && isset($_POST["percent"]) && isset($_POST["sumAdd"])){

    if($_POST["sum"] < 1000 || $_POST["sum"] > 3000000){
        echo json_encode(['sum' => ' ', 'message' => "Неверно указана сумма вклада!"]);
        return;
    }
    if($_POST["term"] < 1 || $_POST["term"] > 60){
        echo json_encode(['sum' => ' ', 'message' => "Неверно указан срок вклада!"]);
        return;
    }
    if($_POST["sumAdd"] < 0 || $_POST["sumAdd"] > 3000000){
        echo json_encode(['sum' => ' ', 'message' => "Неверно указана сумма пополнения вклада!"]);
        return;
    }
    if($_POST["percent"] < 3 || $_POST["percent"] > 100 || ($_POST["percent"] !== strval(intval($_POST["percent"]))) ){
        echo json_encode(['sum' => ' ', 'message' => "Неверно указана процентная ставка!"]);
        return;
    }
    else{
        $timestamp = strtotime($_POST["startDate"]);
        $total = monthlyIncome($timestamp, $_POST["sum"], $_POST["term"], $_POST["sumAdd"], $_POST["percent"]);
        $total = "₽ " . strval($total);
        echo json_encode(['sum' => $total, 'message' => "Сумма к выплате: "]);
        return;
    }
}



function getDaysBetween ($date){
    $day = date('d', $date);
    $days = date('t', $date);
    return intval($days) - intval($day);
}

function nextMonth ($date){
    $month = date('m', $date);
    $year = date('y', $date);
    if ($month == '12'){
        $year = intval($year) - 1;
        $month = '01';
    }
    else {
        $month = intval($month) + 1;
    }
    $nextDate = new DateTime();
    $nextDate->setDate($year, $month, 1);
    return $nextDate->getTimestamp();
}
