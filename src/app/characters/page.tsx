import Characters from "@/components/Characters"
import style from "@/styles/characters.module.css"

export default function CharactersPage() {
    return (
        <div className={style.page}>
            <Characters />
        </div>
    )
}