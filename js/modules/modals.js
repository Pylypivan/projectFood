function modals() {
         
    
                     ///  modal ///
       
   let modalTrigger = document.querySelectorAll('[data-modal]');
   let modal = document.querySelector('.modal');
   let modalClose = document.querySelector('[data-close]');
   


  

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
}

export default modals;