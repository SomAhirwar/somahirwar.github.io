const init = () => {
    const places = ['india','canada','maldives','cuba','italy','france','nepal','iceland','america','japan','switzerland', 'south africa','russia'];
    places.forEach(el => {
        //Making first letter after space toUpperCase
        //let name = el.split(' ').map(el1 => el1.replace(el1[0],el1[0].toUpperCase())).join(' ');

        //insering into html
        const HTML = `
                <div class="city col span-1-of-3">
                    <h3>${el}</h3>
                    <img src="resources/img/${el.replace(' ','\ ')}.jpg"/>
                    <ion-icon class="down-icon" name="chevron-down-outline"></ion-icon>
                </div>
        `;
        document.querySelector('.container').insertAdjacentHTML('beforeend', HTML);
    });

}

init();

//document.querySelector('.container').children[2].insertAdjacentHTML('afterend',HTML);