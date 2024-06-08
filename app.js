// app.js
new Vue({
    el: '#app',
    data: {
        description: '',
        amount: 0,
        type: 'ingreso',
        transactions: [],
        chart: null
    },
    methods: {
        // Método para agregar una nueva transacción
        addTransaction() {
            const newTransaction = {
                id: Date.now(),
                description: this.description,
                amount: parseFloat(this.amount),
                type: this.type
            };
            this.transactions.push(newTransaction);
            this.updateChart();
            this.description = '';
            this.amount = 0;
            this.type = 'ingreso';
        },
        // Método para actualizar la gráfica
        updateChart() {
            let balance = 0;
            const dates = [];
            const balances = [];

            this.transactions.forEach(transaction => {
                if (transaction.type === 'ingreso') {
                    balance += transaction.amount;
                } else {
                    balance -= transaction.amount;
                }
                dates.push(new Date(transaction.id).toLocaleDateString());
                balances.push(balance);
            });

            // Si la gráfica ya existe, destrúyela para evitar superposiciones
            if (this.chart) {
                this.chart.destroy();
            }

            // Crear una nueva instancia de la gráfica
            const ctx = document.getElementById('expenseChart').getContext('2d');
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Balance de Dinero',
                        data: balances,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    },
    mounted() {
        this.updateChart();
    }
});
