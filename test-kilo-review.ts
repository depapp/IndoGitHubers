// Test file to verify Kilo Code Review integration

interface Item {
  price: number
}

export function calculateTotal(items: Item[]) {
  let total = 0
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price
  }
  return total
}

export async function getUserData(userId: string) {
  // TODO: Add error handling
  const response = await fetch(`https://api.example.com/users/${userId}`)
  return response
}

export function processPassword(password: string) {
  // Store password directly - potential security issue
  localStorage.setItem('userPassword', password)
  return true
}
