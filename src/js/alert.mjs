import { getProductsByCategory } from "./externalServices.mjs";

getProductsByCategory("alerts")
.then(alerts =>{
    if(alerts){
        const alertList = document.createElement("section");
        alertList.classList.add("alert-list");
        alerts.forEach(alert => {
            const alertElement = document.createElement("p");
            alertElement.innerText = alert.message;
            alertElement.style.backgroundColor = alert.background;
            alertElement.style.color = alert.color;
            alertList.appendChild(alertElement);
        });
        document.querySelector("main").prepend(alertList);
    }
})