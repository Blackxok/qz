let processButton = document.getElementById('processButton')
let textArea = document.getElementById('questionInput')
let questions = []
let ques = [
	'Savol 1',
	'Savol 2',
	'Savol 3',
	'Savol 4',
	'Savol 5',
	'Savol 6',
	'Savol 7',
	'Savol 8',
	'Savol 9',
	'Savol 10',
]
let fromUp = questions

// let downloadButton = document.getElementById('downloadButton')

processButton.addEventListener('click', function () {
	// Textarea'dagi ma'lumotlarni olish
	let input = textArea.value
	let lines = input.split('\n')
	let currentQuestion = null

	// Har bir qator bo'ylab
	lines.forEach(line => {
		line = line.trim()
		if (line === '') {
			return // Bo'sh qatorlarni o'tkazib yuborish
		}
		if (!line.startsWith('-')) {
			// Yangi savol
			if (currentQuestion) {
				questions.push(currentQuestion)
			}
			currentQuestion = {
				question: line,
				options: [],
			}
		} else {
			// To'g'ri savol uchun variant
			let isCorrect = line.includes('*')
			currentQuestion.options.push({
				text: line.replace('*', '').trim(),
				correct: isCorrect,
			})
		}
	})

	// Oxirgi savolni qo'shish
	if (currentQuestion) {
		questions.push(currentQuestion)
	}

	// Natijani oddiy string ko'rinishida saqlash
	let A = JSON.stringify(questions, null, 2)

	// Konsolga chiqarish
	// console.log(A)

	// Savollar sonini tekshirish
	if (questions.length < selectedCount) {
		alert(`Siz ${questions.length} ta savol kiritdingiz`)
	}
	// =====================generate call
	generateVariantFunction(fromUp)
	// ========================================================

	// questions.map(e => {
	// 	// console.log(e)
	// 	console.log(`${e.question}
	//                    ${e.options[0].text}
	// 				 ${e.options[1].text}
	// 				 ${e.options[2].text}
	// 				 ${e.options[3].text}`)
	// })
})
// ------------------------------------------------------------------processButton end

// Dropdown question data
let selectedCount = 0
let dropdownItems = document.querySelectorAll('.dropdown-item')
dropdownItems.forEach(item => {
	item.addEventListener('click', function (event) {
		event.preventDefault()
		selectedCount = parseInt(this.getAttribute('data-value'), 10)
		// console.log('Selected count:', selectedCount)
	})
})
// Dropdown variant data
let selectedVariant = 0
let dropdownVariant = document.querySelectorAll('.dropdown-v')
dropdownVariant.forEach(item => {
	item.addEventListener('click', function (event) {
		event.preventDefault()
		selectedVariant = parseInt(this.getAttribute('data-value'), 10)
		seceltedV()
	})
})
function seceltedV(e) {
	// console.log('Selected variant:', selectedVariant)
}

// -----------------------------------------------------------------------GENERATE
// 10 ta savol

// generate array items
function generateVariantFunction(e_arr) {
	let shuffleArray = array => {
		let shuffled = array.slice() // Original massivni nusxalash
		for (let i = shuffled.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1))
			;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Elementlarni almashish
		}
		return shuffled
	}

	// 10 xil variant yaratish
	let generateVariants = (e_arr, numVariants) => {
		let variants = []
		for (let i = 0; i < numVariants; i++) {
			variants.push(shuffleArray(e_arr))
		}
		return variants
	}

	// numVariants xil variant
	let numVariants = 10
	let variantsCall = generateVariants(e_arr, numVariants)

	// Natijani ko'rsatish
	variantsCall.forEach((variant, index) => {
		console.log(variant[0], index)
	})
}
