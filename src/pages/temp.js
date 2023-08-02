const data = {
    "usecase": {
        "__typename": "UsecaseEntityResponse",
        "data": {
            "__typename": "UsecaseEntity",
            "id": "1",
            "attributes": {
                "__typename": "Usecase",
                "ttile": "energy efficient"
            }
        }
    }
}

console.log(data?.usecase?.data)