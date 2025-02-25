import { Cliente } from "src/app/clientes/models/cliente"
import { Funcionario } from "src/app/funcionarios/models/funcionario"
import { Pagamento } from "src/app/pagamentos/models/pagamento"

export interface Chamados {
    idChamado?:number
    titulo:string
    descricao:string
    dataEntrada:Date
    status:string
    funcionario:Funcionario
    cliente: Cliente | null
    pagamento: Pagamento
}
