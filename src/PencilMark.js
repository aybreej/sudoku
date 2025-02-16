export function PencilMark({ marks }) {
    return (
        <>
            <div className="pencil" key="pencilMark-1" position="1">{marks[0]}</div>
            <div className="pencil" key="pencilMark-2" position="2">{marks[1]}</div>
            <div className="pencil" key="pencilMark-3" position="3">{marks[2]}</div>
            <div className="pencil" key="pencilMark-4" position="4">{marks[3]}</div>
            <div className="pencil" key="pencilMark-5" position="5">{marks[4]}</div>
            <div className="pencil" key="pencilMark-6" position="6">{marks[5]}</div>
            <div className="pencil" key="pencilMark-7" position="7">{marks[6]}</div>
            <div className="pencil" key="pencilMark-8" position="8">{marks[7]}</div>
            <div className="pencil" key="pencilMark-9" position="9">{marks[8]}</div>
        </>
    );
}