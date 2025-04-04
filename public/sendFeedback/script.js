document.addEventListener('DOMContentLoaded', async () => {
    const memberSelect = document.getElementById('memberSelect');
    const evaluationForm = document.getElementById('evaluationForm');
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    const totalValue = document.querySelector('.total-value');

    // Fetch members data
    async function fetchMembers() {
        try {
            const response = await fetch('https://assiut-robotics-zeta.vercel.app/members/get/media');
            const data = await response.json();
            
            if (data.date) {
                data.date.forEach(member => {
                    const option = document.createElement('option');
                    option.value = member._id;
                    option.textContent = member.name;
                    memberSelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    // Calculate total evaluation
    function calculateTotal() {
        const tasksDeadline = parseInt(document.getElementById('tasksDeadline').value);
        const behavior = parseInt(document.getElementById('behavior').value);
        const groupInteraction = parseInt(document.getElementById('groupInteraction').value);
        const technicalPerformance = parseInt(document.getElementById('technicalPerformance').value);

        const total = Math.round((tasksDeadline + behavior + groupInteraction + technicalPerformance) / 4);
        totalValue.textContent = `${total}%`;
        return total;
    }

    // Update range input displays
    rangeInputs.forEach(input => {
        const display = input.nextElementSibling;
        input.addEventListener('input', () => {
            display.textContent = `${input.value}%`;
        });
    });

    // Handle form submission
    evaluationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const memberId = memberSelect.value;
        if (!memberId) {
            alert('Please select a member');
            return;
        }

        const selectedAwards = Array.from(document.querySelectorAll('input[name="awards"]:checked'))
            .map(checkbox => checkbox.value);

        const feedbackData = {
            committee: committeeSelect.value,
            tasksDeadline: parseInt(document.getElementById('tasksDeadline').value),
            behavior: parseInt(document.getElementById('behavior').value),
            groupInteraction: parseInt(document.getElementById('groupInteraction').value),
            technicalPerformance: parseInt(document.getElementById('technicalPerformance').value),
            total: parseInt(document.getElementById('total').value),
            awards: selectedAwards
        };

        try {
            const response = await fetch(`https://assiut-robotics-zeta.vercel.app/members/sendFeedBackEmail/${memberId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedbackData)
            });

            if (response.ok) {
                alert('Feedback sent successfully!');
                evaluationForm.reset();
            } else {
                throw new Error('Failed to send feedback');
            }
        } catch (error) {
            console.error('Error sending feedback:', error);
            alert('Failed to send feedback. Please try again.');
        }
    });

    // Initialize
    await fetchMembers();
});