// test-password.ts — run with ts-node or in a Next.js API route temporarily
import bcrypt from 'bcrypt'

const stored = "$2b$10$rXWwDfSmQHtrZKxmwv91e.QyBHOfOSmAUIABkav9Rj1c26S2rScdq"

const tests = ["athashri", "Athashri", "athashri123", "password", "123456"]

for (const guess of tests) {
    const result = await bcrypt.compare(guess, stored)
    console.log(`"${guess}" → ${result}`)
}