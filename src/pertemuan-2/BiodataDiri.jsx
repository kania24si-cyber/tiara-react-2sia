export default function BiodataDiri(){

    const propsBiodata = {
        nama: "Tiara Kania Noer Riska",
        nim: "2457301146",
        prodi: "Sistem Informasi",
        hobi: "Desain dan Menggambar",
        skill: "Desain",
        kontak: "kania24si@mahasiswa.pcr.ac.id"
    }

    return (
        <div className="card">
            <h1>Biodata Diri</h1>

            <Foto />
            <Nama nama="Tiara Kania Noer Riska" />
            <Nim nim="2457301146" />
            <Prodi prodi="Sistem Informasi" />
            <Hobi hobi="Desain dan Menggambar" />
            <Skill skill="Desain" />
            <Kontak kontak="kania24si@mahasiswa.pcr.ac.id" />

            <QuoteHobi />

            <UserBiodata {...propsBiodata}/>
        </div>
    )
}


function Foto(){
    return (
        <div>
            <img src="/img/biodata.jpeg" alt="foto" width="150"/>
        </div>
    )
}

function Nama(props){
    return <p>Nama: {props.nama}</p>
}

function Nim(props){
    return <p>NIM: {props.nim}</p>
}

function Prodi(props){
    return <p>Prodi: {props.prodi}</p>
}

function Hobi(props){
    return <p>Hobi: {props.hobi}</p>
}

function Skill(props){
    return <p>Skill: {props.skill}</p>
}

function Kontak(props){
    return <p>Email: {props.kontak}</p>
}

function QuoteHobi(){
    const text = "Belajar React Itu Menyenangkan";
    const text2 = "Saya Suka Belajar hal baru";

    return (
        <div>
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}

function UserBiodata(props){
    return (
        <div>
            <hr/>
            <h3>Ringkasan</h3>
            <p>Nama: {props.nama}</p>
            <p>NIM: {props.nim}</p>
            <p>Prodi: {props.prodi}</p>
        </div>
    )
}