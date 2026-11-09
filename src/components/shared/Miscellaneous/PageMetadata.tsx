import Head from "next/head";
import {MaybeChildren} from "$lib/utils/UtilTypes";
import {useRouter} from "next/router";
import {APP_NAME, BASE_PATH} from "$config";


interface PageMetadataProps {
    text: string
    description?: string
    image?: string
}

export function PageMetadata({text, description, image, children}: MaybeChildren<PageMetadataProps>) {
    const {pathname} = useRouter();
    const isHomepage = APP_NAME === 'Genshin' && !BASE_PATH && pathname === '/';
    const homepageDescription = '原神琴谱练习与录制工具，用键盘或鼠标弹奏风物之诗琴、镜花之琴的曲子';
    const pageDescription = isHomepage ? homepageDescription : description;
    return <Head>
        <title>{text}</title>
        {pageDescription && <>
            <meta name="description" content={pageDescription}/>
            <meta property="og:description" content={pageDescription}/>
        </>}
        {isHomepage && <>
            <link rel="canonical" href="https://gsmusic.march7th.cn/"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://gsmusic.march7th.cn/"/>
            <meta property="og:title" content={text}/>
            <meta property="og:site_name" content="March7th · 三月七工具站"/>
            <meta property="og:locale" content="zh_CN"/>
            <meta name="twitter:card" content="summary"/>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": text,
                "url": "https://gsmusic.march7th.cn/",
                "description": homepageDescription,
                "applicationCategory": "MusicApplication",
                "operatingSystem": "Web",
                "inLanguage": "zh-CN",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://march7th.cn/#website",
                    "name": "March7th · 三月七工具站",
                    "url": "https://march7th.cn/"
                },
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://march7th.cn/#org",
                    "name": "March7th Team",
                    "url": "https://march7th.cn/"
                }
            }).replace(/</g, '\\u003c')}}/>
        </>}
        {image && <>
            <meta name="image" content={image}/>
            <meta property="og:image" content={image}/>
        </>}
        {children}
    </Head>
}
