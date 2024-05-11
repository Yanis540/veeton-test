


declare global {
    interface User {
        id: string 
        name: string 
        email: string 
    }
    
    interface Chat {
        id :string
    }
    type UserDetails = Omit<User, "email">
    interface Message {
        id : string 
        content : string 
        created_at : Date
        chat_id : string 
        chat : Chat  
    }
}

export {}