class List {
    constructor(){
       this.dataList = [
           {position:1,name:"Primeiro Item"},
           {position:2,name:"Segundo Item"},
           {position:3,name:"Terceiro Item"},
        ];
       this.inputItem = document.getElementById('new_item');
       this.selectPosition = document.getElementById('positions');
       this.list = document.getElementById('list');
    }

    add(){
        // Recupera a posição do select.
        const position = this.getPosition();

        // Atualiza lista pra cima
        this.updatePositions(position);

        // Insere novo item à lista
        this.dataList.push({
            position:position,
            name: this.inputItem.value
        });

        // Reordena
        this.reorderList();

        // Renderiza
        this.render();
    }

    updatePositions(pos){
        this.dataList = this.dataList.map(e=>{
            if(e.position >= pos){
                /* Se a posição do elemento atual for maior ou igual a posição recebida
                  incrementa Mais um na posição do elemento.
                */
                e.position++;
            }
            return e;
        })
    }

    reorderList(){
        this.dataList.sort((a,b)=> {
            return a.position < b.position ? -1 : a.position > b.position ? 1 : 0;
        });
    }

    getPosition(){
        let pos = parseInt(this.selectPosition.value || 1);
        return pos;
    }

    render(){
        // Zera valor do input
        this.inputItem.value="";

        // Rederiza a lista.
        this.list.innerHTML = this.dataList.reduce((accumulator,item)=>{
            accumulator+= `<li> ${item.position} - ${item.name}</li>`
            return accumulator;
        },''); 

        // Redenriza o select com as posições.
        this.selectPosition.innerHTML = this.dataList.reduce((accumulator,item)=>{
            accumulator+= `<option value='${item.position}'>Posição ${item.position}</option>`;
            return accumulator;
        },''); 

        // Adiciona a próxmia posição ao select e deixa ela selecionada.
        const pos = (this.dataList[this.dataList.length - 1] || {}).position + 1;
        this.selectPosition.innerHTML += `<option value='${pos}'>Posição ${pos}</option>`;
        this.selectPosition.value = pos
    }
}

let list = new List();
list.render();