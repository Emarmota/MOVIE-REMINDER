class MovieComoponent {
    constructor() {}

    build(src, index){
        let img = $("img")
        img.addClass(`img-${index} slider-img`)
        img.attr("index", index)
        img.attr("src", src)
        return img
    }
}

export { MovieComoponent };