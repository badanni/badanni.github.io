(function(){
  const font_size_text="10px";  
  var elements = document.getElementsByClassName("cert_badge");
    for(var i = 0; i < elements.length; i++) {
      const cert_canvas = elements[i];
      cert_canvas.setAttribute('style','display: inline-block; background-color: rgb(255,255,255,0.8); border-radius: 5px;');
      cert_canvas.setAttribute('scrolling','no');
      let cert_name =cert_canvas.getAttribute('cert_name').toUpperCase();
      if(cert_name.length > 80){
        cert_name=cert_name.substring(0, 77)+"...";
      }
      let cert_type ="TYPE: "+cert_canvas.getAttribute('cert_type').toUpperCase();
      if(cert_type.length > 80){
        cert_type=cert_type.substring(0, 77)+"...";
      }
      let cert_issuer='ISSUER: '+cert_canvas.getAttribute('cert_issuer').toUpperCase();
      if(cert_issuer.length > 80){
        cert_issuer=cert_issuer.substring(0, 77)+"...";
      }
      let cert_logo=cert_canvas.getAttribute('cert_logo');
      let cert_href=cert_canvas.getAttribute('cert_href');
      const cert_card = document.createElement('a');
      cert_card.setAttribute('href',cert_href);
      cert_card.setAttribute('style','text-decoration:none; color: inherit;')
      //color: inherit;
      cert_card.setAttribute('target','_blank');
      cert_card.setAttribute('rel','noopener noreferrer');
      const cert_body = document.createElement('div');
      cert_body.setAttribute('style','text-align: center; min-width:150px; max-width: 150px; width: 150px; min-height: 250px; max-height: 250px; height: 250px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); transition: 0.3s; border: 2px solid grey; border-radius: 5px; padding: 5px; margin: 2px;');
      cert_body.setAttribute('onmouseover',"this.style.box-shadow='0 8px 16px 0 rgba(0,0,0,0.2);'");
      cert_body.setAttribute('onmouseout',"this.style.box-shadow=''");
      const cert_img = document.createElement('img');
      cert_img.setAttribute('src', cert_logo);
      cert_img.setAttribute('style','height: 105px; width:105px;');
      const cert_container = document.createElement('div');
      cert_container.setAttribute('style','padding: 2px 16px;');
      const cert_container_cert_name = document.createElement('div');
      cert_container_cert_name.setAttribute('style','height: 80px; font-size: '+font_size_text+'; white-space: pre-wrap; word-wrap: break-word; overflow: hidden; text-overflow: ellipsis;');
      cert_container_cert_name.innerHTML=cert_name
      const cert_container_cert_type = document.createElement('div');
      cert_container_cert_type.setAttribute('style','font-size: '+font_size_text+'; white-space: nowrap; word-wrap: break-word; overflow: hidden; text-overflow: ellipsis;');
      cert_container_cert_type.innerHTML=cert_type
      const cert_container_cert_issuer = document.createElement('div'); 
      cert_container_cert_issuer.setAttribute('style','font-size: '+font_size_text+'; white-space: nowrap; word-wrap: break-word; overflow: hidden; text-overflow: ellipsis;');
      cert_container_cert_issuer.innerHTML=cert_issuer
      cert_container.appendChild(cert_container_cert_name);
      cert_container.appendChild(cert_container_cert_type);
      cert_container.appendChild(cert_container_cert_issuer);
      cert_body.appendChild(cert_img);
      cert_body.appendChild(cert_container);
      cert_card.appendChild(cert_body);
      if (cert_canvas.hasChildNodes()){
        cert_canvas.replaceChild(cert_card, cert_canvas.childNodes[0]);  
      }else{
        cert_canvas.appendChild(cert_card);
      }
    }
    }).call(this);