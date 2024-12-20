
function cargarPub(idPub)
{
    fetch(`/devolverPublicacion?idPub=${idPub}`) /*pedicion al servidor*/
    .then(response => response.json())
    .then(data => {
        tituloPub = document.getElementById('tituloPub')
        autorPub = document.getElementById('autorPub')
        descripcionPub = document.getElementById('descripcionPub')
        idPublicacion = document.getElementById('idPublicacion')
        comentariosTotales = document.getElementById('comentariosTotales')

        imagenPub = document.getElementById('imagenPub')

        if(data.imgPub !== null)
        {
            imagenPub.src = `data:image/jpeg;base64,${data.imgPub}`
            imagenPub.style.display = 'block'
        }
        else
        {
            imagenPub.style.display = 'none'
        }

        tituloPub.value = ''
        autorPub.value = ''
        descripcionPub.value = ''
        idPublicacion.innerHTML = ''
        comentariosTotales.innerHTML = ''

        tituloPub.value = data.titulo
        autorPub.value = data.autor
        descripcionPub.value = data.descripcion
        idPublicacion.innerHTML = String(idPub)

        for(let j = 0; j < data.datosComentarios.length; j++)
        {
            seccionComentario = `
            <div class="row mb-3">
                <div class="col-3">
                    ${data.datosComentarios[j].autor}
                </div>
                <div class="col-9">
                    ${data.datosComentarios[j].descripcion}
                </div>
            </div>
            `
            comentariosTotales.innerHTML = comentariosTotales.innerHTML + seccionComentario
        }
    })
}

function enviarComentario()
{
    comentarioUsuario = document.getElementById('comentarioUsuario')
    idPublicacion = document.getElementById('idPublicacion')

    datos = {
        'comentario':comentarioUsuario.value,
        'idPublicacion': idPublicacion.innerHTML
    }

    fetch('/publicarComentario',
    {
        method:"POST",
        headers:
        {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body:JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('comentarioUsuario').value = ''
        cargarPub(idPublicacion.innerHTML)
    })
}

function getCookie(name)
{
    let cookieValue = null;
    if (document.cookie && document.cookie !== "")
    {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++)
        {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "="))
            {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function cargarInformacionUsuario(idUsuario)
/*PREGUNTA 4
    DESARROLLAR LA FUNCION DE JAVASCRIPT QUE PERMITA CONSULTAR LA RUTA
    OBTENERDATOSUSUARIO?IDUSUARIO=${IDUSUARIO}
 */ {
    fetch(`/obtenerDatosUsuario?idUsusario=${idUsuario}`)
        .then(response => response.json())
        .then(data => {
            usernameUsuario = document.getElementById('usernameUsario')
            contraUsuario = document.getElementById('contraUsuario')
            nombreUsuario = document.getElementById('nombreUsuario')
            apellidoUsuario = document.getElementById('apellidoUsuario')
            emailUsuario = document.getElementById('emailUsuario')
            profesionUsuario = document.getElementById('profesionUsuario')
            nroCelular = document.getElementById('nroCelular')
            perfilUsuario = document.getElementById('perfilUsuario')
            /*
            REVISAR LA IMPLEMENTACION REALIZADA PARA EDITAR MOSTRAR PUBLICACIONES
        
            TENER EN CUENTA EL INPUT QUE ESTA OCULTO Y CARGAR AHI EL ID DEL USUARIO
            PARA PODER ENVIARLO AL SERVIDOR COMO PARTE DE LOS DATOS Y ASI PODER
            RECUPERAR EL OBJETO USUARIO Y ACTUALIZAR LOS DATOS
            */
            usernameUsuario = data.username
            contraUsuario = data.password
            nombreUsuario = data.first_name
            apellidoUsuario = data.last_name
            emailUsuario = data.email
            profesionUsuario = data.profesion
            nroCelular = data.nroCelular
            perfilUsuario = data.perfilUsuario

            idUsuario.innerHTML = String(idUsuario)

        })
}