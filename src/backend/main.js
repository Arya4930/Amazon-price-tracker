import ScrapeWebsite from "./functions/ScrapeWebsite.js";
import tracking from "./DB/tracking.js";

export default async function scrapeWebsites(clients, cachedProducts) {
    const urls = [
        "https://www.amazon.in/gp/product/B0BB9ZH2LK/ref=ox_sc_act_image_1?smid=A3LMMNCB8LRXW0&psc=1",
        "https://www.amazon.in/ASUS-Battery-i7-12700H-Windows-FX507ZV-LP094W/dp/B0C4TW7328/?_encoding=UTF8&pd_rd_w=jHTm2&content-id=amzn1.sym.4d5b78c6-4f80-4b93-8d16-deb7aaa19e3f%3Aamzn1.symc.afd86303-4a72-4e34-8f6b-19828329e602&pf_rd_p=4d5b78c6-4f80-4b93-8d16-deb7aaa19e3f&pf_rd_r=94PTD8JAEMFMC55RTNN1&pd_rd_wg=OYGwn&pd_rd_r=38df7e9d-3514-42f2-be62-4bd4defedddb&ref_=pd_gw_ci_mcx_mr_hp_atf_m",
        "https://www.amazon.in/gp/product/B09BVCVTBC/ref=ox_sc_saved_image_1?smid=A14CZOWI0VEHLG&psc=1",
        "https://www.amazon.in/ASUS-Advantage-Battery-Sandstorm-FA617XS-N3026WS/dp/B0C4TW2SZM/ref=sr_1_1_sspa?crid=1FH1WBJ0VSBGZ&keywords=asus+tuf+f15&qid=1708280327&sprefix=asus+t%2Caps%2C256&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        "https://www.amazon.in/permanent-guarantee-Arduino-Uno/dp/B0044X2E5S/ref=sr_1_4?crid=1PMS364D3GP97&dib=eyJ2IjoiMSJ9.gGEp_d-Pdy1_dVQLfnjAocEVs_z0vRhvs57A-ntOQ_XiSXw6TYx24K0WtWSqveXSpyVpwTxH8NlBY0WxZMimw2shA4LMYSxQfDyl45tPQFBHTw00eynSNLsY222ZSz8j5rLeWYu_87KX8lE9fcpYA_eyftYcM9Z2IBinmz5yJI-p2XMh9rNCzUzVpV6APAMQRTEt6gcVnfwf_h6Gl2QwT9AE4MYu0x2ipry19Ab5su5nuP9p3sRSiggUQLfvJ0jUehxwZCFtNdzqlWOPaLecwKNW0QBYNXKOH0TBr3Ekopg.IpMwRvw1GAN0m9Qh-oKd6szbd0Oeb4Gx_-kB7t9v9bo&dib_tag=se&keywords=arduino+uno&nsdOptOutParam=true&qid=1731339158&sprefix=arduino%2Caps%2C326&sr=8-4",
        "https://www.amazon.in/Razer-DeathAdder-Essential-White-RZ01-03850200-R3M1/dp/B092R71V77/ref=pd_bxgy_thbs_d_sccl_1/260-0398836-7123562?pd_rd_w=tEZLB&content-id=amzn1.sym.c7ef6266-a9b9-4df2-ad24-f795ecdadcdc&pf_rd_p=c7ef6266-a9b9-4df2-ad24-f795ecdadcdc&pf_rd_r=531H6D877DXAKK4NZKD9&pd_rd_wg=s7Mnl&pd_rd_r=ab620c2a-cd80-49e8-8b08-2b9d439faded&pd_rd_i=B092R71V77&psc=1",
    ];
    const d = new Date();
    console.log(`====================== ${d} ======================`);
    for (const url of urls) {
        await ScrapeWebsite(url, tracking);
    }
    cachedProducts = await tracking.findAll();
    for (const client of clients) {
        client.send("reload");
    }
}