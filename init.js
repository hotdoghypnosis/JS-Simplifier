const cookie = { get value () { return document.cookie }, get (name) { try { return document.cookie.split('; ').find(v => v.startsWith(name)).split('=')[1] } catch { return false } }, delete (name) { return document.cookie = name + '=; expires=Thu, 04 Jul 1776 00:00:00 ET; path=/;' }, clear () { return document.cookie.split('; ').forEach(v => this.delete(v.split('=')[0])) }, write (...args) { for (let i of args) document.cookie = `${Object.entries(i)[0].join('=')};path=${i.path || '/'};${'expires' in i ? 'expires=' + i.expires : ''}` } }
