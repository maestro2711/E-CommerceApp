import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);  // Category-Typ verwendet
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);  // Category[]-Daten setzen
        };
        fetchCategories();
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;
        if (selectedCategory) {
            navigate(`/?category=${selectedCategory}`);
        } else {
            navigate('/');
        }
    };

    return (
        <nav>
            <ul>

                <li>
                    <label htmlFor="category-select">Kategorien:</label>
                    <select id="category-select" onChange={handleCategoryChange}>
                        <option value="">Alle Kategorien</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
