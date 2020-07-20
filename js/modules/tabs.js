function tabs() {

    let tabContent = document.querySelectorAll('.tabcontent'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsParent = document.querySelector('.tabheader__items');
   
    function hideTabsContent() {
        tabContent.forEach(item=> {
            item.classList.add('hide');
            item.classList.remove('show');

        });
        tabs.forEach(item=> {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabsContent(i = 0) {
       tabContent[i].classList.add('show');
       tabContent[i].classList.remove('hide');
       tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabsContent();

     tabsParent.addEventListener('click',(event)=> {
         const target = event.target;
          if (target && target.classList.contains('tabheader__item')) {
              tabs.forEach((item,i) => {
                  if (target == item) {
                   hideTabsContent();
                   showTabsContent(i);
                  }
              });
          }
     });

}

export default tabs;