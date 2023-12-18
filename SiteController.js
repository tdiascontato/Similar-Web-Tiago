require('dotenv').config()
const axios = require('axios')
const Site = require('../models/Site')

exports.request = async (req, res) => {
    try {

        const { url } = req.params
        const options = {
            method: 'GET',
            headers: {
              cookie: 'sgID=8ce2a131-2d46-4533-b048-216b2fcb0f3c; _gcl_au=1.1.1966384715.1702666204; _pk_id.1.fd33=5a0684147c4b7c04.1702666205.; locale=en-us; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_uuid=JFE90B425B144EBCA16DC7555716D57B9; _vwo_ds=3%241702666233%3A18.00304524%3A%3A; _fbp=fb.1.1702666236094.1521955893; _vwo_uuid_v2=D2E7888088761EA2FF13BD1B24F55F74B|6599785c7e7640e1ea7adabde23dd3bf; cb_user_id=null; cb_group_id=null; cb_anonymous_id=%225cd1fbd9-e39b-4cbc-a921-f6bc0d3b5c58%22; __zlcmid=1JKmLeq0fcSwkim; .SGTOKEN.SIMILARWEB.COM=fszFPnqBwjJqAltBtpkUgPThd54YDvlBYA6R7snCOeFEcaZWF1qRqrgZ5NikVG_CcjGDmFNYwo0sK9Ise0lhVD8O7g0LmZk0gafslR_kdS8iIezox-UGIvU-rgFwsu-N2wtGd-9xTQH4qUE4Nm_hAKZxH7Kh7jjJlrqrQO5RQNo02cdJ1GuxGvHABTPuDRFAXdTob3RoN42fMTM7XCDQYl1yiG8Svt5py9jO8kQlOkt22sWLoyb-d2e-M3M5-I3WoJGlzQZMxCH2Ighde5XkA4eaEKZ8fiCnJdbXysiUV3YMmmz-MtzkndUj52H2Ybmdj5LLBtmTgHZ7T73Ci2f-z6R-3RK0kfczUla_DSrbPG8NBpJDxq7tDXZP7OVZmb8u; registrationpersona_22595160=similarweb.com; ps_mode=trackingV1; vv_visitor_id=9heSjKsSvrRQnb8o5o8TQHogT36fVYJ; _li_dcdm_c=.similarweb.com; _lc2_fpi=4357aabd7500--01hhqqq2y8jgq5fgjgjmgx4mvz; _lc2_fpi_meta={%22w%22:1702677416904}; _BEAMER_USER_ID_zBwGJEbQ32550=911a79bb-ed26-4ef1-a0d4-9f3610de7319; _BEAMER_FIRST_VISIT_zBwGJEbQ32550=2023-12-15T21:56:57.579Z; RESET_PRO_CACHE=False; corp_locale=en-us; fs_uid=#ND4K8#e4d13bec-3f9a-4660-882e-13e85897bd0f:ab73c396-dfdb-48ae-bbd4-60cd8fc17e4e:1702685909813::3#a5f9968f#/1734217937; _otui=1204564325.1702677418739.1702685912127.1702722987953.4.7.1095664; _gid=GA1.2.72692097.1702852540; _ga_L5S0QVWQE6=GS1.1.1702854658.5.0.1702854658.60.0.0; fsrndidpro=false; _abck=3B6821A28BD28DDC0A59F0D5FA2C8032~0~YAAQzh4RyXKj8VyMAQAAsMD/egsrQn4YXaPEQVq2UI6pRh8iRGkCe7uusv9/1E6YjIX3C31WHkZEnEtl2/Pb2Rt47CMJezgkEqATd+hFDqCJ3rgzlgQzhV17Fz/o37Acmz1cl1B9vgOU5cvP+4iMCcKZbmJV75O8HaYTp1V0AIAs6LQLZmMXDJKuEVo0wd4jcgzKSui06xKxFeE0cMNL7UHQjB6h9tigiSKzWl83HaLI3wH4/HRuYAP1L+8sqxpRS1QdJNRs9+/YFLXDRz5vQ92yl3VhxlqE/eEcio6Y5usRYWtBLhtklCwTLEvpNwSpQkOKbXJhBwBWHfiGgiUN8XFaP/WrlrB8uF/qUu595MyPbgxA/o0nRqnE+q4l/xyHhuBHH1xZB+7Vk+fg4NUGwzOvFbFRAH0Yes6OCg==~-1~-1~-1; ak_bmsc=E90855DC36152229231DCEC08210971A~000000000000000000000000000000~YAAQth4RyTG/jHKMAQAAWcn/ehbFXLmr47Lf4inVJ/QYjkkGk3rVjY1un6rbg6q1Efr1H46TzREbDF3p4v3VuPxoqKO2HvvCZnZlBuqxVFml4/1ONqPn0RAijLxm0TfaMg04dJ4wAuN7L1+BOriLqNhR5zoHZB4/LG9kzI5WToIiDc81Htc0JJYMq+n/z4uvJSUdp9lRHxZoE7tKcOK6JmqMIGRPCq+vOlVOmrrUcvMo0Ul6WnHvyWQZ9bzs+2fYiwVd7ZrJt45hqajNts1PFxc26Oj8E8SlxXP5fJDHpfHVkjiQTR2ARDJB0k7Ck6fnkpsuma3QJc2Jh428ExzEkQKJF8vV2pg2b3HsSoLLnZ9i9i69x9pNhAJw+ljnqZfcoEOwy/RVVF815cyoXh4O09pg1eByxv1HywmZ8IVdDDK8bQgrp529kAZ9969S+yNzV2halDDxeHy5Nl62XZ3eXDR7Bg2XhhwmhUWGgurdixFcdTVe3mKF9J1NjNAHDpL106yG; bm_sz=39383E2C0B507CBEB607AB1FEA08C7F5~YAAQth4RyTO/jHKMAQAAZM//ehZ4JxIK+3efv+Nvww/jWY+KsaT9DRoAXGcZDZ847tRG0AytqhKjGEJ3sH+6W8AAfaimZ1+bgXObI+gDLvKV6CjlBveRipF+xJ5ALVXi7vvlQ7qlnQNfdo7KtJOoqx8Jv/B2y96OfIpXsdfjf2+6U/utMdppIEKCQjOawZVTGd+rz2qrHfIrK4vvg1c7rPUKkvmqTYTJjplLngNTC6Q5jBX9DdP59xYy4Ux50f03ttBPow8tA9VFQDB0uLbG9apfjXpuWgWocqK9gBdYBF/ki10/fBo/cqg87SuZT8DhWKJ3gauKsglMu0bm/+H2AA==~4534841~3553347; _pk_ref.1.fd33=%5B%22%22%2C%22%22%2C1702870639%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; _pk_ses.1.fd33=1; _ga=GA1.1.1283995761.1702666204; _ga_V5DSP51YD0=GS1.1.1702870639.8.0.1702870639.60.0.0; _ga_JKZGLE7YPK=GS1.2.1702870642.7.0.1702870642.0.0.0; _BEAMER_FILTER_BY_URL_zBwGJEbQ32550=true; _BEAMER_FILTER_BY_URL_zBwGJEbQ32550=true; __q_state_9u7uiM39FyWVMWQF=eyJ1dWlkIjoiNjc4Njk1NjUtODVjYi00YWUwLWIyMGItZTQ5MjZjZjQ3YjE5IiwiY29va2llRG9tYWluIjoic2ltaWxhcndlYi5jb20iLCJtZXNzZW5nZXJFeHBhbmRlZCI6ZmFsc2UsInByb21wdERpc21pc3NlZCI6ZmFsc2UsImNvbnZlcnNhdGlvbklkIjoiMTI5MTExMzY1NzkxNjA1Njc2NSJ9; _BEAMER_LAST_UPDATE_zBwGJEbQ32550=1702871064323; _ga_V5DSP51YD=GS1.1.1702870634.6.1.1702871179.0.0.0; mp_7ccb86f5c2939026a4b5de83b5971ed9_mixpanel=%7B%22distinct_id%22%3A%20%2222595160%22%2C%22%24device_id%22%3A%20%2218c7a85bd202f52-071617409e8c44-26001951-100200-18c7a85bd202f52%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fpro.similarweb.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22pro.similarweb.com%22%2C%22%24user_id%22%3A%20%2222595160%22%2C%22sgId%22%3A%20%228ce2a131-2d46-4533-b048-216b2fcb0f3c%22%2C%22site_type%22%3A%20%22Pro%22%2C%22ui_generation%22%3A%20%2220231217.48836.169a7b8%22%2C%22session_id%22%3A%20%2243a9d725-7729-4337-a23e-03749da37506%22%2C%22session_first_event_time%22%3A%20%222023-12-18T03%3A37%3A19.993Z%22%2C%22last_event_time%22%3A%201702871179621%2C%22url%22%3A%20%22https%3A%2F%2Fpro.similarweb.com%2F%23%2Fdigitalsuite%2Facquisition%2FDMItracker%3FtrackerId%3D39534dbd-ace6-4026-9937-be8e08921afb%22%2C%22is_sw_user%22%3A%20false%2C%22language%22%3A%20%22en-us%22%2C%22page_id%22%3A%20%22Competitive%20Trackers-Competitive%20Tracker%20Page-Competitive%20Tracker%20Page%22%2C%22sidebar_version%22%3A%20%223.1%22%2C%22subscription_id%22%3A%20%2247529692%22%2C%22base_product%22%3A%20%22FRO%20DMI%20Trial%22%2C%22user_id%22%3A%2022595160%2C%22account_id%22%3A%2010000041%2C%22email%22%3A%20%22tdiascontato%40gmail.com%22%2C%22role%22%3A%20%22AccountUser%22%2C%22section%22%3A%20%22Competitive%20Trackers%22%2C%22sub_section%22%3A%20%22Competitive%20Tracker%20Page%22%2C%22sub_sub_section%22%3A%20%22Competitive%20Tracker%20Page%22%2C%22is_asset_owner%22%3A%20false%7D; bm_sv=C1CB0DA71B1158C982A78631B276F49B~YAAQth4Ryaq/jHKMAQAA4pQIexbee0QnWB8D6tlKhPY0WLlJhFC8HtQGrHQJ3R4QTm3Lu21Gg/whGCciESSecIy8YcBR6jU6UZYKoUU3JFqbe01Uvwe0QzYK2NIQVZRjYKUKYLFLKp5xQfpke2BDO7ZBzaOS0qyloLNlAeNwTHqn04RGqqX82TEyDmsoDSMXFRCxtsp/MRPON6TPEkClAPDnM6KYPDJJrC4GJw2Tzei4pRGOu/HrQFZOYc6E+8umK2eTAcU=~1',
              authority: 'pro.similarweb.com',
              accept: 'application/json',
              'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
              'cache-control': 'no-cache',
              'content-type': 'application/json; charset=utf-8',
              dnt: '1',
              pragma: 'no-cache',
              referer: 'https://pro.similarweb.com/',
              'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"Windows"',
              'sec-fetch-dest': 'empty',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'same-origin',
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'x-requested-with': 'XMLHttpRequest',
              'x-sw-page': 'https://pro.similarweb.com/#/digitalsuite/acquisition/DMItracker?trackerId=39534dbd-ace6-4026-9937-be8e08921afb',
              'x-sw-page-view-id': 'ef525d81-d0e9-42fd-b329-467f04b56237'
            },
            params: {
                keys: url,
                mainDomainOnly: true,
                includeCrossData: true,
                webSource: 'Total',
            },
            body: 'false'
          };
          
          const response = await axios.get('https://pro.similarweb.com/api/WebsiteOverview/getheader', options);

          console.log(response.data);

        return res.status(201).json({ success: true, description: 'success in: ' + url })

    } catch (err) {
    console.error("Erro na solicitação da API:", err);
    res.status(400).json({ success: false, erro: "request api", description: err.message });
}
    
}
exports.save_info = async (req, res) => {
    try {
        
        const { url } = req.params
        const options = {
            method: 'GET',
            headers: {
              cookie: 'sgID=8ce2a131-2d46-4533-b048-216b2fcb0f3c; _gcl_au=1.1.1966384715.1702666204; _pk_id.1.fd33=5a0684147c4b7c04.1702666205.; locale=en-us; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_uuid=JFE90B425B144EBCA16DC7555716D57B9; _vwo_ds=3%241702666233%3A18.00304524%3A%3A; _fbp=fb.1.1702666236094.1521955893; _vwo_uuid_v2=D2E7888088761EA2FF13BD1B24F55F74B|6599785c7e7640e1ea7adabde23dd3bf; cb_user_id=null; cb_group_id=null; cb_anonymous_id=%225cd1fbd9-e39b-4cbc-a921-f6bc0d3b5c58%22; __zlcmid=1JKmLeq0fcSwkim; .SGTOKEN.SIMILARWEB.COM=fszFPnqBwjJqAltBtpkUgPThd54YDvlBYA6R7snCOeFEcaZWF1qRqrgZ5NikVG_CcjGDmFNYwo0sK9Ise0lhVD8O7g0LmZk0gafslR_kdS8iIezox-UGIvU-rgFwsu-N2wtGd-9xTQH4qUE4Nm_hAKZxH7Kh7jjJlrqrQO5RQNo02cdJ1GuxGvHABTPuDRFAXdTob3RoN42fMTM7XCDQYl1yiG8Svt5py9jO8kQlOkt22sWLoyb-d2e-M3M5-I3WoJGlzQZMxCH2Ighde5XkA4eaEKZ8fiCnJdbXysiUV3YMmmz-MtzkndUj52H2Ybmdj5LLBtmTgHZ7T73Ci2f-z6R-3RK0kfczUla_DSrbPG8NBpJDxq7tDXZP7OVZmb8u; registrationpersona_22595160=similarweb.com; ps_mode=trackingV1; vv_visitor_id=9heSjKsSvrRQnb8o5o8TQHogT36fVYJ; _li_dcdm_c=.similarweb.com; _lc2_fpi=4357aabd7500--01hhqqq2y8jgq5fgjgjmgx4mvz; _lc2_fpi_meta={%22w%22:1702677416904}; _BEAMER_USER_ID_zBwGJEbQ32550=911a79bb-ed26-4ef1-a0d4-9f3610de7319; _BEAMER_FIRST_VISIT_zBwGJEbQ32550=2023-12-15T21:56:57.579Z; RESET_PRO_CACHE=False; corp_locale=en-us; fs_uid=#ND4K8#e4d13bec-3f9a-4660-882e-13e85897bd0f:ab73c396-dfdb-48ae-bbd4-60cd8fc17e4e:1702685909813::3#a5f9968f#/1734217937; _otui=1204564325.1702677418739.1702685912127.1702722987953.4.7.1095664; _gid=GA1.2.72692097.1702852540; _ga_L5S0QVWQE6=GS1.1.1702854658.5.0.1702854658.60.0.0; fsrndidpro=false; _abck=3B6821A28BD28DDC0A59F0D5FA2C8032~0~YAAQzh4RyXKj8VyMAQAAsMD/egsrQn4YXaPEQVq2UI6pRh8iRGkCe7uusv9/1E6YjIX3C31WHkZEnEtl2/Pb2Rt47CMJezgkEqATd+hFDqCJ3rgzlgQzhV17Fz/o37Acmz1cl1B9vgOU5cvP+4iMCcKZbmJV75O8HaYTp1V0AIAs6LQLZmMXDJKuEVo0wd4jcgzKSui06xKxFeE0cMNL7UHQjB6h9tigiSKzWl83HaLI3wH4/HRuYAP1L+8sqxpRS1QdJNRs9+/YFLXDRz5vQ92yl3VhxlqE/eEcio6Y5usRYWtBLhtklCwTLEvpNwSpQkOKbXJhBwBWHfiGgiUN8XFaP/WrlrB8uF/qUu595MyPbgxA/o0nRqnE+q4l/xyHhuBHH1xZB+7Vk+fg4NUGwzOvFbFRAH0Yes6OCg==~-1~-1~-1; ak_bmsc=E90855DC36152229231DCEC08210971A~000000000000000000000000000000~YAAQth4RyTG/jHKMAQAAWcn/ehbFXLmr47Lf4inVJ/QYjkkGk3rVjY1un6rbg6q1Efr1H46TzREbDF3p4v3VuPxoqKO2HvvCZnZlBuqxVFml4/1ONqPn0RAijLxm0TfaMg04dJ4wAuN7L1+BOriLqNhR5zoHZB4/LG9kzI5WToIiDc81Htc0JJYMq+n/z4uvJSUdp9lRHxZoE7tKcOK6JmqMIGRPCq+vOlVOmrrUcvMo0Ul6WnHvyWQZ9bzs+2fYiwVd7ZrJt45hqajNts1PFxc26Oj8E8SlxXP5fJDHpfHVkjiQTR2ARDJB0k7Ck6fnkpsuma3QJc2Jh428ExzEkQKJF8vV2pg2b3HsSoLLnZ9i9i69x9pNhAJw+ljnqZfcoEOwy/RVVF815cyoXh4O09pg1eByxv1HywmZ8IVdDDK8bQgrp529kAZ9969S+yNzV2halDDxeHy5Nl62XZ3eXDR7Bg2XhhwmhUWGgurdixFcdTVe3mKF9J1NjNAHDpL106yG; bm_sz=39383E2C0B507CBEB607AB1FEA08C7F5~YAAQth4RyTO/jHKMAQAAZM//ehZ4JxIK+3efv+Nvww/jWY+KsaT9DRoAXGcZDZ847tRG0AytqhKjGEJ3sH+6W8AAfaimZ1+bgXObI+gDLvKV6CjlBveRipF+xJ5ALVXi7vvlQ7qlnQNfdo7KtJOoqx8Jv/B2y96OfIpXsdfjf2+6U/utMdppIEKCQjOawZVTGd+rz2qrHfIrK4vvg1c7rPUKkvmqTYTJjplLngNTC6Q5jBX9DdP59xYy4Ux50f03ttBPow8tA9VFQDB0uLbG9apfjXpuWgWocqK9gBdYBF/ki10/fBo/cqg87SuZT8DhWKJ3gauKsglMu0bm/+H2AA==~4534841~3553347; _pk_ref.1.fd33=%5B%22%22%2C%22%22%2C1702870639%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; _pk_ses.1.fd33=1; _ga=GA1.1.1283995761.1702666204; _ga_V5DSP51YD0=GS1.1.1702870639.8.0.1702870639.60.0.0; _ga_JKZGLE7YPK=GS1.2.1702870642.7.0.1702870642.0.0.0; _BEAMER_FILTER_BY_URL_zBwGJEbQ32550=true; _BEAMER_FILTER_BY_URL_zBwGJEbQ32550=true; __q_state_9u7uiM39FyWVMWQF=eyJ1dWlkIjoiNjc4Njk1NjUtODVjYi00YWUwLWIyMGItZTQ5MjZjZjQ3YjE5IiwiY29va2llRG9tYWluIjoic2ltaWxhcndlYi5jb20iLCJtZXNzZW5nZXJFeHBhbmRlZCI6ZmFsc2UsInByb21wdERpc21pc3NlZCI6ZmFsc2UsImNvbnZlcnNhdGlvbklkIjoiMTI5MTExMzY1NzkxNjA1Njc2NSJ9; _BEAMER_LAST_UPDATE_zBwGJEbQ32550=1702871064323; _ga_V5DSP51YD=GS1.1.1702870634.6.1.1702871179.0.0.0; mp_7ccb86f5c2939026a4b5de83b5971ed9_mixpanel=%7B%22distinct_id%22%3A%20%2222595160%22%2C%22%24device_id%22%3A%20%2218c7a85bd202f52-071617409e8c44-26001951-100200-18c7a85bd202f52%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fpro.similarweb.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22pro.similarweb.com%22%2C%22%24user_id%22%3A%20%2222595160%22%2C%22sgId%22%3A%20%228ce2a131-2d46-4533-b048-216b2fcb0f3c%22%2C%22site_type%22%3A%20%22Pro%22%2C%22ui_generation%22%3A%20%2220231217.48836.169a7b8%22%2C%22session_id%22%3A%20%2243a9d725-7729-4337-a23e-03749da37506%22%2C%22session_first_event_time%22%3A%20%222023-12-18T03%3A37%3A19.993Z%22%2C%22last_event_time%22%3A%201702871179621%2C%22url%22%3A%20%22https%3A%2F%2Fpro.similarweb.com%2F%23%2Fdigitalsuite%2Facquisition%2FDMItracker%3FtrackerId%3D39534dbd-ace6-4026-9937-be8e08921afb%22%2C%22is_sw_user%22%3A%20false%2C%22language%22%3A%20%22en-us%22%2C%22page_id%22%3A%20%22Competitive%20Trackers-Competitive%20Tracker%20Page-Competitive%20Tracker%20Page%22%2C%22sidebar_version%22%3A%20%223.1%22%2C%22subscription_id%22%3A%20%2247529692%22%2C%22base_product%22%3A%20%22FRO%20DMI%20Trial%22%2C%22user_id%22%3A%2022595160%2C%22account_id%22%3A%2010000041%2C%22email%22%3A%20%22tdiascontato%40gmail.com%22%2C%22role%22%3A%20%22AccountUser%22%2C%22section%22%3A%20%22Competitive%20Trackers%22%2C%22sub_section%22%3A%20%22Competitive%20Tracker%20Page%22%2C%22sub_sub_section%22%3A%20%22Competitive%20Tracker%20Page%22%2C%22is_asset_owner%22%3A%20false%7D; bm_sv=C1CB0DA71B1158C982A78631B276F49B~YAAQth4Ryaq/jHKMAQAA4pQIexbee0QnWB8D6tlKhPY0WLlJhFC8HtQGrHQJ3R4QTm3Lu21Gg/whGCciESSecIy8YcBR6jU6UZYKoUU3JFqbe01Uvwe0QzYK2NIQVZRjYKUKYLFLKp5xQfpke2BDO7ZBzaOS0qyloLNlAeNwTHqn04RGqqX82TEyDmsoDSMXFRCxtsp/MRPON6TPEkClAPDnM6KYPDJJrC4GJw2Tzei4pRGOu/HrQFZOYc6E+8umK2eTAcU=~1',
              authority: 'pro.similarweb.com',
              accept: 'application/json',
              'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
              'cache-control': 'no-cache',
              'content-type': 'application/json; charset=utf-8',
              dnt: '1',
              pragma: 'no-cache',
              referer: 'https://pro.similarweb.com/',
              'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"Windows"',
              'sec-fetch-dest': 'empty',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'same-origin',
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'x-requested-with': 'XMLHttpRequest',
              'x-sw-page': 'https://pro.similarweb.com/#/digitalsuite/acquisition/DMItracker?trackerId=39534dbd-ace6-4026-9937-be8e08921afb',
              'x-sw-page-view-id': 'ef525d81-d0e9-42fd-b329-467f04b56237'
            },
            params: {
                keys: url,
                mainDomainOnly: true,
                includeCrossData: true,
                webSource: 'Total',
            },
            body: 'false'
          };
          
        const response = await axios.get('https://pro.similarweb.com/api/WebsiteOverview/getheader', options);
        const dados = response.data
        console.log(dados);

        const savesite = new Site({
            url,
            dados,
        });
        const savedSite = await savesite.save();

        res.status(201).json({ message: 'Informações salvas com sucesso.', id: savedSite._id, data: dados })
    } catch (err) {
        res.status(400).json({ success: false, Erro: err })
    }
}
exports.return_info = async (req, res) => {
    try {
        const { url } = req.params
        const site = await Site.findOne({ url });
        return site ? res.status(201).json({ Conteúdo: site.dados }) : res.status(400).json({ success: false, Erro: 'Site não encontrado.' })
    } catch (err) {
        res.status(400).json({ Erro: 'Erro no catch ' + err, Sucess: false })
    }
}