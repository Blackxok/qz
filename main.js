let processButton = document.getElementById('processButton')
let textArea = document.getElementById('questionInput')
let dropdownQuestion = document.querySelectorAll('.dropdown-item')
let dropdownVariant = document.querySelectorAll('.dropdown-v')
let questions = []
let selectedVariant = 5
let selectedCount = 5

//
// Dropdown question data
dropdownQuestion.forEach(item => {
	item.addEventListener('click', function (event) {
		event.preventDefault()
		selectedCount = parseInt(this.getAttribute('data-value'), 10)
		// console.log('Selected count:', selectedCount) // Tanlangan qiymatni tekshirish
	})
})
// Dropdown variant data
dropdownVariant.forEach(item => {
	item.addEventListener('click', function (event) {
		event.preventDefault()
		selectedVariant = parseInt(this.getAttribute('data-value'), 10)
		// console.log('Selected count:', selectedVariant)
		//
	})
})

// textArea dagi malumotlarni olish
processButton.addEventListener('click', () => {
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
	// =====================generate call
	// if (selectedVariant === 0) {
	// 	alert('Variantlar sonini tanlang')
	// } else if (selectedCount === 0) {
	// 	alert('Savollar sonini tanlang')
	// } else {
	// }
	generateVariantFunction(questions, selectedVariant, selectedCount)
})
// -----------------------------------------------------------------------GENERATE

function generateVariantFunction(e_arr, numVariants, selectedCount) {
	let shuffleArray = array => {
		let shuffled = array.slice() // Original massivni nusxalash
		for (let i = shuffled.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1))
			;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Elementlarni almashish
		}
		return shuffled
	}

	// Variantlarni yaratish
	let generateVariants = (e_arr, numVariants, questionsNumber) => {
		let variants = []
		for (let i = 0; i < numVariants; i++) {
			let shuffledQuestions = shuffleArray(e_arr).slice(0, questionsNumber)
			let variant = shuffledQuestions.map(question => ({
				question: question.question,
				options: shuffleArray(question.options), // Variantlarni ham tasodifiy tartibda
			}))
			variants.push(variant)
		}
		return variants
	}

	// Variantlarni yaratish va natijani ko'rsatish
	let variantsCall = generateVariants(e_arr, numVariants, selectedCount)

	variantsCall.forEach((variant, index) => {
		console.log(variant[0].question, variant[0].options)
	})
}

// =================================================================
// --===============================================================
