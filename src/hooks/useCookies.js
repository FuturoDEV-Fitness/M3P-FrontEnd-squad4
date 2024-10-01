const setCookie = (name, value, days, path = "/", domain, secure) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // qtdDay * 24 horas * 60 minutos * 60 segundos * 1000 milisegundos
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${encodeURIComponent(value || "")}${expires}; path=${path}${domain ? `; domain=${domain}` : ""}${secure ? "; secure" : ""}`;
};

const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
};

const eraseCookie = (name, path = "/") => {
    document.cookie = `${name}=; Max-Age=-99999999; path=${path}`;
};

export { setCookie, getCookie, eraseCookie };