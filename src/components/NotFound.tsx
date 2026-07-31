import Image from "next/image";
import style from "@/styles/notFound.module.css"

export default function NotFound() {
    return (
        <div className={style.container}>
            <Image
                src={"/imges/spinning-portal-gray.gif"}
                height={50}
                width={50}
                alt="Spinning gray portal"
            />
            <p className={style.text}>|</p>
            <p className={style.text}>Character(s) not found</p>
        </div>
    )
}