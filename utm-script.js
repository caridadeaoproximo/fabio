// Script para capturar parâmetros UTM e passar para links de checkout
(function() {
    'use strict';

    // Parâmetros UTM que queremos capturar
    const utmParams = [
        'utm_source',
        'utm_medium', 
        'utm_campaign',
        'utm_content',
        'utm_term',
        'xcod'
    ];

    // Função para obter parâmetros UTM da URL atual
    function getUTMParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {};
        
        utmParams.forEach(param => {
            const value = urlParams.get(param);
            if (value) {
                params[param] = value;
            }
        });
        
        return params;
    }

    // Função para construir query string com parâmetros UTM
    function buildQueryString(params) {
        return Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    // Função para adicionar parâmetros UTM aos links de checkout
    function addUTMToCheckoutLinks() {
        const utmParams = getUTMParams();
        
        // Se não há parâmetros UTM, não faz nada
        if (Object.keys(utmParams).length === 0) {
            return;
        }

        const queryString = buildQueryString(utmParams);
        
        // Seleciona todos os links de checkout
        const checkoutLinks = document.querySelectorAll('a[href*="checkout.geterectus.site"]');
        
        checkoutLinks.forEach(link => {
            const currentHref = link.getAttribute('href');
            const separator = currentHref.includes('?') ? '&' : '?';
            const newHref = currentHref + separator + queryString;
            link.setAttribute('href', newHref);
        });
    }

    // Função para adicionar parâmetros UTM a um link específico
    function addUTMToLink(linkUrl) {
        const utmParams = getUTMParams();
        
        if (Object.keys(utmParams).length === 0) {
            return linkUrl;
        }

        const queryString = buildQueryString(utmParams);
        const separator = linkUrl.includes('?') ? '&' : '?';
        
        return linkUrl + separator + queryString;
    }

    // Executa quando o DOM estiver carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addUTMToCheckoutLinks);
    } else {
        addUTMToCheckoutLinks();
    }

    // Expõe a função para uso manual
    window.UTMHelper = {
        addUTMToLink: addUTMToLink,
        getUTMParams: getUTMParams,
        addUTMToCheckoutLinks: addUTMToCheckoutLinks
    };

    // Log para debug (remova em produção)
    console.log('UTM Script carregado. Parâmetros UTM encontrados:', getUTMParams());

})(); 