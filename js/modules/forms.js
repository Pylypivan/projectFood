// const modals = require("./modals");

function forms() {
        
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
}

export default forms;