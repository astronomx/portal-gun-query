"use client";
import { useState } from "react";

import Characters from "@/components/Characters";
import PaginationControls from "@/components/PaginationControls";
import style from "@/styles/characters.module.css";

export default function CharactersPage() {
    const [current, setCurrent] = useState<string>("1")

    return (
        <div className={style.page}>
            <Characters current={current} />
            <PaginationControls current={current} setCurrent={setCurrent} />
        </div>
    )
}