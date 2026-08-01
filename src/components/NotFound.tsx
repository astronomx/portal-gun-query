import Image from "next/image";
import style from "@/styles/notFound.module.css"

export default function NotFound() {
    return (
        <div className={style.container}>
            <Image
                src={"/images/spinning-portal-gray.gif"}
                height={160}
                width={160}
                alt="Spinning gray portal"
                unoptimized
                loading="eager"
            />
            <p className={style.text}>|</p>
            <p className={style.text}>Character(s) not found</p>
        </div>
    )
}