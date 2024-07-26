let trueOption = []
const processButton = document.getElementById('processButton')
const textArea = document.getElementById('questionInput')
const dropdownQuestionItems = document.querySelectorAll('.dropdown-item')
const dropdownVariantItems = document.querySelectorAll('.dropdown-v')
const questionsContainer = document.getElementById('questions-container')
const downloadButton = document.getElementById('downloadButton')
const dropdownMenuButton1 = document.getElementById('dropdownMenuButton1')
const dropdownMenuButton2 = document.getElementById('dropdownMenuButton2')

// Global o'zgaruvchilar
let questions = []
let selectedVariantCount = 0
let selectedQuestionCount = 0

// Dropdown elementlari uchun event listener'lar
function setupDropdownListeners() {
	dropdownQuestionItems.forEach(item => {
		item.addEventListener('click', function (event) {
			event.preventDefault()
			selectedQuestionCount = parseInt(this.getAttribute('data-value'), 10)
		})
	})

	dropdownVariantItems.forEach(item => {
		item.addEventListener('click', function (event) {
			event.preventDefault()
			selectedVariantCount = parseInt(this.getAttribute('data-value'), 10)
		})
	})
}
// TextArea'dan ma'lumotlarni olish va qayta ishlash
function processTextAreaInput() {
	const input = textArea.value
	const lines = input.split('\n')
	let currentQuestion = null

	lines.forEach(line => {
		line = line.trim()
		if (line === '') return

		if (!line.startsWith('-')) {
			if (currentQuestion) questions.push(currentQuestion)
			currentQuestion = { question: line, options: [] }
		} else {
			const isCorrect = line.includes('*')
			currentQuestion.options.push({
				text: line.replace('*', '').trim(),
				correct: isCorrect,
			})
		}
	})

	if (currentQuestion) questions.push(currentQuestion)
}
// Massivni tasodifiy tartibda aralashtirish
function shuffleArray(array) {
	const shuffled = array.slice()
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled
}

// Variantlarni yaratish va savollar o'rnini tasodifiy tarzda o'zgartirish
function generateVariants(questions, variantCount, questionCount) {
	if (questionCount > questions.length) {
		console.error('Savollar soni variantdagi savollar sonidan kam.')
		return []
	}

	const variants = []
	for (let i = 0; i < variantCount; i++) {
		const shuffledQuestions = shuffleArray(questions).slice(0, questionCount)
		const variant = shuffledQuestions.map(question => ({
			question: question.question,
			options: shuffleArray(question.options),
		}))
		variants.push(variant)
	}
	return variants
}

// Variantlarni HTML elementlarga aylantirib chiqarish
function renderVariants(variants) {
	questionsContainer.innerHTML = '' // Avvalgi kontentni tozalash
	variants.forEach((variant, index) => {
		const card = document.createElement('div')
		card.className = 'question-card'
		card.textContent = `Variant ${index + 1}`

		const OptionsCon = document.createElement('div')
		variant.forEach((question, i) => {
			const ulQuestion = document.createElement('ul')
			ulQuestion.textContent = `${i + 1}: ${question.question}`
			OptionsCon.appendChild(ulQuestion)

			question.options.forEach(option => {
				const liOption = document.createElement('li')
				liOption.textContent = option.text
				if (option.correct) {
					trueOption.push(option.text)
				}
				ulQuestion.appendChild(liOption)
			})
		})

		card.appendChild(OptionsCon)
		questionsContainer.appendChild(card)
	})
}

// PDF yuklab olish funksiyasi
function downloadAsPDF() {
	const element = document.getElementById('questions-container')
	const opt = {
		margin: 0.5,
		filename: 'questions.pdf',
		image: { type: 'jpeg', quality: 0.98 },
		html2canvas: { scale: 2, logging: true, letterRendering: true },
		jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
	}
	html2pdf().from(element).set(opt).save()
}

// Asosiy funksiya
function generateVariantFunction() {
	if (selectedVariantCount === 0) {
		alert('Variantlar sonini tanlang')
		return
	}
	if (selectedQuestionCount === 0) {
		alert('Savollar sonini tanlang')
		return
	}

	processTextAreaInput()
	const variants = generateVariants(
		questions,
		selectedVariantCount,
		selectedQuestionCount
	)

	renderVariants(variants)
}

// chech input Area
function checkInputArea() {
	generateVariantFunction()
	if (questions.length < selectedQuestionCount) {
		alert(`${questions.length}-ta savol kiritdingiz!!!`)
	}

	questions.length = 0
	// ----------------------------------------------
}
// ----------------------------------------------
dropdownQuestionItems.forEach(item => {
	item.addEventListener('click', function () {
		dropdownMenuButton1.innerText = this.innerText
	})
})
dropdownVariantItems.forEach(item => {
	item.addEventListener('click', function () {
		dropdownMenuButton2.innerText = this.innerText
	})
})

// Event listener'larni o'rnatish
setupDropdownListeners()

processButton.addEventListener('click', checkInputArea)
downloadButton.addEventListener('click', downloadAsPDF)

console.log(trueOption)
