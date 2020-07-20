function cards() {
     
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
}

export default  cards;