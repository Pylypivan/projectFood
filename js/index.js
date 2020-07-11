window.addEventListener('DOMContentLoaded', ()=> {
    
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

                  ///  modal ///
       
   let modalTrigger = document.querySelectorAll('[data-modal]');
   modal = document.querySelector('.modal');
   modalClose = document.querySelector('[data-close]');
   


  

         function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';



         }
      modalTrigger.forEach(item=> {
       item.addEventListener('click',openModal); 
   
      });
     

//      modalClose.addEventListener('click',()=> {
//        modal.classList.add('hide');
//        modal.classList.remove('show');
//    });

   function closeModal() {
       modal.classList.add('hide');
       modal.classList.remove('show');
       document.body.style.overflow = '';


       
   }
   modalClose.addEventListener('click', closeModal);
   
   

   modal.addEventListener('click',(e)=> {
      if (e.target === modal ) {
          closeModal();
      }
   });
//    || e.target.getAttribute(data-close) == ''
   
   document.addEventListener('keydown',(e)=> {
       if (e.code === 'Escape') {
           closeModal();
       }
   });

                 //  Class Card  //


       class MenuCard {
           constructor(src,alt,title,desc,price,parentSelector,...classes) {
               this.src = src;
               this.alt = alt;
               this.title = title;
               this.desc = desc;
               this.price = price;
               this.classes = classes;
               this.parent = document.querySelector(parentSelector);
               this.transfer = 27;
               this.changeUAH();
           }

           changeUAH() {
               this.price = this.price * this.transfer;
           }

           render() {
               const elem = document.createElement('div');

               if (this.classes.length === 0) {
                   this.elem = 'menu__item';
                   elem.classList.add(this.elem);

               } else {
                this.classes.forEach(item=> elem.classList.add(item));

               }
               
               elem.innerHTML =  `

               
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">  ${this.title} </h3>
                    <div class="menu__item-descr"> ${this.desc} </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span> ${this.price} </span> грн/день</div>
                    
                
               
               `;
               this.parent.append(elem);
           }

       }

       new MenuCard(

         'img/tabs/vegy.jpg',
         'vegy',
         'Меню "Фитнес"',

         'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
         9,
         '.menu .container'
         




       ).render();


       new MenuCard(

        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум"',

        'В меню Премиум мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
         14,       
        '.menu .container'
        




      ).render();


      new MenuCard(

        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',

        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
         21,       
        '.menu .container'

      ).render();


       //forms // 

       const forms = document.querySelectorAll('form');

       const message = {
           loading: 'img/form/spinner.svg',
           succsess: 'дякую , з вами скоро звяжуться',
           failure: 'щось пішло не так '
       };

       forms.forEach(i=> {
         bindSendData(i);
        });

        const  postData = async (url,data) => {
            const res = await fetch(url,{
                method:'POST',
                headers: {
                  'Content-type': 'aplication/json'
                },
                body: data

            });
            return await res.json();

        };

       function bindSendData(form) {
           form.addEventListener('submit',(e)=> {
              e.preventDefault();

              const statusMessage = document.createElement('img');
              statusMessage.src = message.loading;
              statusMessage.style.cssText = `
                 display:block;
                 margin: 0 auto;

               `;

              form.append(statusMessage);
              form.insertAdjacentElement('afterend',statusMessage); 

              


              const formData = new FormData(form);

              const json = JSON.stringify(Object.fromEntries(formData.entries()));

             postData('server.php',json)
            
            .then(data =>{
                console.log(data);

                showThanksModal(message.succsess);      
                 statusMessage.remove();

            }).catch(()=> {
                showThanksModal(message.failure);
                
            }).finally(()=> {
                form.reset();

            })
           });
       }



       function showThanksModal(message) {
           const prevModal = document.querySelector('.modal__dialog');

           prevModal.classList.add('hide');

           openModal();

           const thanksModal = document.createElement('div');
           thanksModal.classList.add('.modal__dialog');
           thanksModal.innerHTML = `
           <div class = 'modal__content'>
                 <div class = 'modal__close' data-close >×</div>
                 <div class = 'modal__title' > ${message} </div>
           </div>

           
           
           `;
           document.querySelector('.modal').append(thanksModal);

           setTimeout(()=> {
             thanksModal.remove();
             prevModal.classList.add('show');
             prevModal.classList.remove('hide');
             closeModal();

           },4000);
       }

    
       fetch('db.json')
       .then(data=> data.json())
       .then(res=> console.log(res));



                          // slider // 

    const slides = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    
    let slideIndex = 1;

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0 ${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
           slideIndex = slides.length;
        }

        
        slides.forEach(item=> item.style.display = 'none');
        slides[slideIndex -1].style.display = '';

        if (slides.length < 10) {
            current.textContent = `0 ${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }


    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click',()=> {
        plusSlides(-1);
    });

    next.addEventListener('click',()=> {
        plusSlides(1);
    });

});



