const init = () => {
    const places = ['india','canada','maldives','cuba','italy','france'];
    places.forEach(el => {
        const HTML = `
                <div class="city col span-1-of-3">
                    <h3>${el}</h3>
                    <img src="resources/img/${el}.jpg"/>
                    <ion-icon class="down-icon" name="chevron-down-outline"></ion-icon>
                </div>
        `;
        document.querySelector('.container').insertAdjacentHTML('beforeend', HTML);
    });
}

init();