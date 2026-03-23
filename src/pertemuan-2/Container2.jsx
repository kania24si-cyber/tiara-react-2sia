export default function Container({children}){
    return(
        <div className="card">
            <h1>Laporan Pemrograman Framework Lanjutan</h1>
            <br/>
            {children}
            <br/>
            <footer>
                <p>2026 - Biodata</p>
            </footer>
        </div>
    )
}