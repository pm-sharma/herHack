$(document).ready(function () {
    $(".button-collapse").sideNav({
        closeOnClick: true
    });
    $("#fullpage").fullpage({
        responsiveWidth: 0,
        responsiveSlides: true,
        navigation: true,
        navigationPosition: 'right',
        anchors: ['homeAnchor', 'aboutWTMAnchor', 'aboutHerHackAnchor', 'prizesAnchor', 'herRegistrationAnchor', 'herSponsorsAnchor'],
        afterLoad: function( anchorLink, index){
            if(index===5){
                
            }
        }
    });
    $('select').material_select();
    $('.carousel').carousel({fullWidth: true, noWrap: false});
    $(window).on('hashchange',function(){
        let animationName = 'animated fadeInLeft';
        let animationEnd = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd webkitAnimationEnd';
        $('.contentBox').addClass(animationName).one(animationEnd, function(){
            $('.contentBox').removeClass(animationName);
        });

    });

});
function next() {
    $('.carousel').carousel('next', 1);
}
function callAPI(data){
    return new Promise ((res,rej)=>{
        $.ajax({
            url:'https://hackher.herokuapp.com/register',
            type:'POST',
            data:data,
            success:function (data) {
                res(data);
            },
            error:function () {
                rej(data);
            }
        })
    });
}
function register() {
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let regno = $('#reg').val();
    let gender = $('#dropdown').val();
    const $loading =$('#loading');
    $loading.addClass('la-animate');
    callAPI({fname,lname,email,phone,regno,gender}).then((data)=>{
        $loading.removeClass('la-animate');
        if(data.flag){
            let $regForm=$('#regForm');
            $regForm.before('<h2>Registration successful</h2>');
            $regForm.remove();
        }
        else {
            data.errors.split('+').map((err)=>{
                Materialize.toast(err,3000);
            });
        }
        console.log(data);
    }).catch(function () {
        $loading.removeClass('la-animate');
        Materialize.toast('Network connectivity error !',3000);
    })
}