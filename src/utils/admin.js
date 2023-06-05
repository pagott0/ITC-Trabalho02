/*is called when the admin click the add button function*/
//TODO: add snapshot
const addBox = async (text, eventName, eventYear) => {
    try {
        await addDoc(collection(db, "posts"), {
            text,
            eventName,
            eventYear
        })
    } catch (err) {
        window.alert("Erro ao adicionar evento, tente novamente mais tarde")
    }
}

export { addBox }