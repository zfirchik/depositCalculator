const FloatLabel = (() => {

    const handleFocus = (e) => {
        const target = e.target;
        target.parentNode.classList.add('active');
    };

    const handleBlur = (e) => {
        const target = e.target;
        if(!target.value) {
            target.parentNode.classList.remove('active');
        }
    };

    const bindEvents = (element) => {
        const floatField = element.querySelector('input');
        floatField.addEventListener('focus', handleFocus);
        floatField.addEventListener('blur', handleBlur);
    };
    const init = () => {
        const floatContainers = document.querySelectorAll('.container', '.term');

        floatContainers.forEach((element) => {

            if (element.querySelector('input').value) {
                element.classList.add('active');
            }

            bindEvents(element);
        });
    };

    return {
        init: init
    };
})();

FloatLabel.init();

/* плавающий label в input */



/* jquery datepicker */

$( function() {
    $( "#datepicker").datepicker({
        dateFormat : "dd.mm.yy"
    });
} );





/* вывод sumAdd */

$(".check").click(function () {
    if ($(".optional").css('visibility') == 'hidden'){
        $(".optional").css('visibility', 'visible');
        document.getElementById("monthlyDepositAmount").value = "";
    }
    else {
        $(".optional").css('visibility', 'hidden');
        document.getElementById("monthlyDepositAmount").value = '0';
    }
})




/* фронтенд валидация */

$('.date input[type="text"]').blur(function(){
    if(!$(this).val()){
        $('.date').css("border", 'solid 2px red');
    } else{
        $('.date').css("border", 'solid 2px #33C4A0');

    }
});
$('.term input[type="number"]').blur(function(){
    if(!$(this).val()) {
        $('.term').css("border", 'solid 2px red');
    }
    else if($(this).val() > 5 && $(".monthOrYear").val() > 1){
        $('.term').css("border", 'solid 2px red');
        $('#termWarning').css('display','block');
    }
    else if($(this).val() > 60 || $(this).val() < 1) {
        $('.term').css("border", 'solid 2px red');
        $('#termWarning').css('display','block');
    }
    else{
        $('.term').css("border", 'solid 2px #33C4A0');
        $('#termWarning').css('display','none');
    }
});
$('.monthOrYear').blur(function(){
    if(!$(".term input[type='number']").val()) {
        $('.term').css("border", 'solid 2px red');
    }
    if ($(this).val() > 1 && $(".term input[type='number']").val() > 5){
        $('.term').css("border", 'solid 2px red');
        $('#termWarning').css('display','block');
    }
    else if($(".term input[type='number']").val() > 60 || $(".term input[type='number']").val() < 1) {
        $('.term').css("border", 'solid 2px red');
        $('#termWarning').css('display','block');
    }
    else{
        $('.term').css("border", 'solid 2px #33C4A0');
        $('#termWarning').css('display','none');
    }
});
$('.sum input[type="number"]').blur(function(){
    if(!$(this).val()) {
        $('.sum').css("border", 'solid 2px red');
    }
    else if($(this).val() > 3000000 || $(this).val() < 1000){
        $('.sum').css("border", 'solid 2px red');
        $('#sumWarning').css('display','block');
    }
    else{
        $('.sum').css("border", 'solid 2px #33C4A0');
        $('#sumWarning').css('display','none');
    }
});
$('.percent input[type="number"]').blur(function(){
    if(!$(this).val()) {
        $('.percent').css("border", 'solid 2px red');
    }
    else if($(this).val() > 100 || $(this).val() < 3){
        $('.percent').css("border", 'solid 2px red');
        $('#percentWarning').css('display','block');
    }
    else{
        $('.percent').css("border", 'solid 2px #33C4A0');
        $('#percentWarning').css('display','none');
    }
});
$('.sumAdd input[type="number"]').blur(function(){
    if(!$(this).val()) {
        $('.sumAdd').css("border", 'solid 2px red');
    }
    else if($(this).val() > 3000000 || $(this).val() < 0){
        $('.sumAdd').css("border", 'solid 2px red');
        $('#sumAddWarning').css('display','block');
    }
    else{
        $('.sumAdd').css("border", 'solid 2px #33C4A0');
        $('#sumAddWarning').css('display','none');
    }
});





/* ajax-запрос */

$(".submit").click(
    function(f){
        f.preventDefault();
        let monthMultiplier = $("#monthOrYear").val();
        let oldMonth = $("#depositTime").val();
        $("#depositTime").val(oldMonth * monthMultiplier);
        sendAjaxForm('js-calculationResults', 'calculatorForm', 'calc.php');
        $("#depositTime").val(oldMonth);
        return false;
    });

function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url: url,
        type:     "POST",
        dataType: "html",
        data: $("#"+ajax_form).serialize(),
        success: function(response) {
            result = $.parseJSON(response);
            $('.js-calculationResults').css('display','block');
            $('.calculationText').html(result.message);
            $('.total').html(result.sum);
        },
        error: function(response) {
            $('.calculationText').html('Ошибка. Данные не отправлены.');
        }
    });
}