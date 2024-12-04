export default function Button ({type, className, disabled, label, onClick}) {
    return (
        <>
        <button type={type} className={className} disabled={disabled} onClick={onClick}>{label}</button>
        </>
    )
}