import { supabase } from "./lib/supabase";

function escapeHTML(str){
    const div = document.createElement('div')
    div.textContent = str;
    return div.innerHTML;
}

function isSafeIMG(url){
    try{
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    }catch{
        return false;
    }
}

async function getItems(){
    const { data:{user}} = await supabase.auth.getUser();
    const {data, error} = await supabase.from('ocium').select('*').eq('user_id', user.id);
    if(error) throw error;
    return data;
}

async function addItem(item){
    const cleanTitle = item.title?.trim();
    if(!cleanTitle){
        throw new Error('title is required')
    };
    const safeItem = {
        ...item,
        title: escapeHTML(cleanTitle),
        author: escapeHTML((item.author || 'Unknown').trim()),
        cover: (item.cover && isSafeIMG(item.cover)) ? escapeHTML(item.cover) : null,
    };
    const {data:{user}} = await supabase.auth.getUser();
    if(!user) throw new Error ('Login to continue..');
    const newItem = {
        done: false,
        cover: null,
        ...safeItem,
        user_id: user.id,
    }
    console.log(newItem)
    const {data, error} = await supabase.from("ocium").insert(newItem).select();
    if(error) throw error;
    return data;
}

async function deleteItem(id){
    const {error} = await supabase.from("ocium")
    .delete().eq('id',id);
    if(error) throw error;
}

async function toggleDone(id){
    const {data: currentItem, error: fetchError} = await supabase.from("ocium")
    .select("done").eq('id',id).single();
    if(fetchError) throw fetchError;
    const {error: updateError} = await supabase.from("ocium")
    .update({done: !currentItem.done}).eq('id',id)
    if(updateError) throw updateError;

}



export { getItems, addItem, deleteItem, toggleDone }

