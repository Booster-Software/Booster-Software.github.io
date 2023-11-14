(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 17;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Intro carousel
  var introCarousel = $(".carousel");
  var introCarouselIndicators = $(".carousel-indicators");
  introCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
    (index === 0) ?
    introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>"):
      introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");
  });

  introCarousel.on('slid.bs.carousel', function(e) {
    $(this).find('h2').addClass('animate__animated animate__fadeInDown');
    $(this).find('p, .btn-get-started').addClass('animate__animated animate__fadeInUp');
  });

  // Skills section
  $('#skills').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on('click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({
      filter: $(this).data('filter')
    });
    aos_init();
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 20000,
    autoplayHoverPause: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 4
      },
      900: {
        items: 6
      }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 20000,
    autoplayHoverPause: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 20000,
    autoplayHoverPause: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

// Languages
function getLanguage() {
  let language;
  (localStorage.getItem('language') == null) ? setLanguage('en') : false;
  $.ajax({ 
  url:  '/assets/languages/' +  localStorage.getItem('language') + '.json', 
  dataType: 'json', async: false, dataType: 'json', 
  success: function (lang) { language = lang } });
  return language;
}

function setLanguage(lang) {
  setInactiveFlag(localStorage.getItem('language'));
  localStorage.setItem('language', lang);
  setActiveFlag(localStorage.getItem('language'));
  translate();  
}

function setActiveFlag(lang){
  (lang == null) ? lang='en' : false;
  document.getElementById("languageFlag" + lang.toUpperCase()).classList.add("active-language-flag");
}

function setInactiveFlag(lang){
  (lang == null) ? lang='en' : false;
  document.getElementById("languageFlag" + lang.toUpperCase()).classList.remove("active-language-flag");
}

function translate(){
  const language = getLanguage();
  $('#navMenuHome').text(language.home);
  $('#navMenuAboutUs').text(language.aboutUs);
  $('#navMenuServices').text(language.services);
  $('#navMenuContactUs').text(language.contactUs);
  $('#homeHeader1Text1').text(language.homeHeader1Text1);
  $('#homeHeader1Text2').text(language.homeHeader1Text2);
  $('#homeButton1').text(language.homeButton1);
  $('#homeHeader2Text1').text(language.homeHeader2Text1);
  $('#homeHeader2Text2').text(language.homeHeader2Text2);
  $('#homeButton2').text(language.homeButton2);
  $('#homeCarouselPrevious').text(language.homeCarouselPrevious);
  $('#homeCarouselNext').text(language.homeCarouselNext);
  $('#featuredServicesTitle1').text(language.featuredServicesTitle1);
  $('#featuredServicesDescription1').text(language.featuredServicesDescription1);
  $('#featuredServicesTitle2').text(language.featuredServicesTitle2);
  $('#featuredServicesDescription2').text(language.featuredServicesDescription2);
  $('#featuredServicesTitle3').text(language.featuredServicesTitle3);
  $('#featuredServicesDescription3').text(language.featuredServicesDescription3);
  $('#aboutUsDescription').text(language.aboutUsDescription);
  $('#aboutUsTitle').text(language.aboutUs);
  $('#aboutUsTitle1').text(language.aboutUsTitle1);
  $('#aboutUsDescription1').text(language.aboutUsDescription1);
  $('#aboutUsTitle2').text(language.aboutUsTitle2);
  $('#aboutUsDescription2').text(language.aboutUsDescription2);
  $('#aboutUsTitle3').text(language.aboutUsTitle3);
  $('#aboutUsDescription3').text(language.aboutUsDescription3);
  $('#servicesTitle').text(language.services);
  $('#servicesDescription').text(language.servicesDescription);
  $('#servicesTitle1').text(language.servicesTitle1);
  $('#servicesDescription1').text(language.servicesDescription1);
  $('#servicesTitle2').text(language.servicesTitle2);
  $('#servicesDescription2').text(language.servicesDescription2);
  $('#servicesTitle3').text(language.servicesTitle3);
  $('#servicesDescription3').text(language.servicesDescription3);
  $('#servicesTitle4').text(language.servicesTitle4);
  $('#servicesDescription4').text(language.servicesDescription4);
  $('#servicesTitle5').text(language.servicesTitle5);
  $('#servicesDescription5').text(language.servicesDescription5);
  $('#letsWorkTogetherTitle').text(language.letsWorkTogetherTitle);
  $('#letsWorkTogetherDescription').text(language.letsWorkTogetherDescription);
  $('#letsWorkTogetherCTA').text(language.contactUs);
  $('#ourClients').text(language.ourClients);
  $('#teamDescription').text(language.teamDescription);
  $('#contactUsTitle').text(language.contactUs);
  $('#contactUsDescription').text(language.contactUsDescription);
  $('#address').text(language.address);
  $('#phoneNumber').text(language.phoneNumber);
  $('#email').text(language.email);
  $('#footerLogoDescription').text(language.footerLogoDescription);
  $('#footerUsefulLinks').text(language.footerUsefulLinks);
  $('#footerHome').text(language.home);
  $('#footerAboutUs').text(language.aboutUs);
  $('#footerServices').text(language.services);
  $('#footerContactUs').text(language.contactUs);
  $('#footerPhone').text(language.footerPhone);
  $('#footerEmail').text(language.footerEmail);
  $('#copyright').text(language.copyright);
}

$(document).ready(function(){
  translate();
  setActiveFlag(localStorage.getItem('language'));
});
